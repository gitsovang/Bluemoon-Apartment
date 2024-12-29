from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['BLUEMOON']


cor = CORS(app, origins = '*')


@app.route('/admin_statistic', methods = ['POST'])
def statistic():
    count_new = db['User'].count_documents({})
    if count_new <= 10:
        count = 10
    else:
        count = count_new
    return jsonify({'count': count})

@app.route('/admin_dashboard', methods = ['POST'])
def admin_dashboard():
    count = db['User'].count_documents({})
    return jsonify({'count': count})

@app.route('/user_data_report', methods = ['POST'])
def get_user_data_report():
    months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    data = request.json
    month = data.get('month')

    if month not in months:
        return jsonify({"error": "Invalid month"}), 400

    target_month = months.index(month) + 1

    collection = db['User']

    pipeline = [
    {'$match': {'monthly_data.month': target_month}},
    {'$unwind': '$monthly_data'},
    {'$match': {'monthly_data.month': target_month}},
    {'$group': {'_id': None, 'total': {'$sum': '$monthly_data.data.total'}}}
    ]

    result = collection.aggregate(pipeline)
    count = collection.count_documents({})
    user_data = []
    for user in result:
        result = round(user['total'], 2)
        expense = round(result - ((result * 10)/100), 2)
        user_data.append({
            'UserCount': count,
            'totalRoomFee': result,
            'totalExpense': expense
        })

    return jsonify(user_data)


@app.route('/edit_user_info', methods = ['POST'])
def edit_user_data():
    data = request.get_json()
    collection = db['User']
    user_Id = data["userId"]
    user_Name = data["userName"]
    user_Email = data["userEmail"]
    user_RoomArea = data["userRoomArea"]
    user_RoomNumber = data["userRoomNumber"]

    if not all([user_Id, user_Name, user_Email, user_RoomArea, user_RoomNumber]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if collection.find_one({"_id": user_Id}) == None:
        return jsonify({'error': 'User ID not exists'}), 409
    try:
        collection.update_one({"_id": user_Id}, {
            "$set": {
                    "name": user_Name,
                    "email": user_Email,
                    "roomarea": user_RoomArea,
                    "roomnumber": user_RoomNumber
                    }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/delete_user', methods = ['POST'])
def delete_user_data():
    data = request.get_json()
    collection = db['User']
    user_Id = data["userId"]
    user_Name = data["userName"]

    if not all([user_Id, user_Name]):
        return jsonify ({'error': 'Missing required fields'}), 400
    
    filter = collection.find_one({"_id": user_Id, "name": user_Name})
    try:
        if filter:
            collection.delete_many(filter)
        else:
            return jsonify({'error': 'User Id or User Name not existes'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'message': 'User deleted successfully'}), 200

@app.route('/add_user', methods = ['POST'])
def add_user_data():
    data = request.get_json()
    collection = db['User']
    user_Id = data["userId"]
    user_Name = data["userName"]
    user_Email = data["userEmail"]
    user_RoomArea = data["userRoomArea"]
    user_RoomNumber = data["userRoomNumber"]

    if not all([user_Id, user_Name, user_Email, user_RoomArea, user_RoomNumber]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if collection.find_one({"_id": user_Id}):
        return jsonify({'error': 'User ID already exists'}), 409
    if collection.find_one({"name": user_Name}):
        return jsonify({'error': 'User name already exists'}), 410
    if collection.find_one({"roomnumber": user_RoomNumber}):
        return jsonify({'error': 'Room number already exists'}), 411

    
    def create_user(user_id, name, email, room_number, room_areas):
        date = datetime.now().strftime("%Y-%m-%d/%H:%M:%S")
        return {
        "_id": user_id,
        "name": name,
        "email": email,
        "roomarea": room_areas,
        "roomnumber": room_number,
        "registerdate": date,
        "monthly_data": [],
    }

    def add_monthly_data(user_id, month, datas):
        collection.update_one(
        {"_id": user_id},
        {"$push": {
            "monthly_data": {
                "month": month,
                "data": datas
            }
        }}
    )

    user = create_user(user_Id, user_Name, user_Email, user_RoomNumber, user_RoomArea) 
    #calulate room_fee
    room_fee = user_RoomArea * 1.4662
    try:
        collection.insert_one(user)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    for month in range(1, 13):
            add_monthly_data(user_Id, month, {"roomfee": room_fee, "status": "", "waterusage": 0, "electricusage": 0, "electricfee": 0, "waterfee": 0, "internetfee": 0, "carmotorparkingfee": 0, "total": 0})

    return jsonify({'message': 'User added successfully'}), 200

@app.route('/get_info', methods = ['GET'])
def get_user_info():
    user_id = request.args.get('userId')
    user = db['User'].find_one({"_id": user_id})
    user_data = []
    if user: 
        user_data.append({
            '_id': user_id,
            'name': user['name'],
            'email': user['email'],
            'roomnumber': user['roomnumber'],
            'roomarea': user['roomarea'],
            'registerdate': user['registerdate']
        })
        return jsonify(user_data)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_user_data', methods = ['GET'])
def get_user_data():
    users = db['User'].find()
    user_data = []
    for user in users:
        user_data.append({
            '_id': user['_id'],
            'name': user['name'],
            'email': user['email'],
            'roomnumber': user['roomnumber'],
            'roomarea': user['roomarea'],
            'registerdate': user['registerdate']
        })
    return jsonify(user_data)

@app.route('/get_month', methods=['POST'])
def get_month_data():
    month = request.args.get('month')
    users = db['User'].find()
    users_data = []
    for user in users:
        for data in user['monthly_data']:
            if data['month'] == int(month):
                users_data.append({
                    '_id': user['_id'],
                    'name': user['name'],
                    'roomfee': round(data['data']['roomfee'], 2),
                    'status': data['data']['status'],
                    'electricfee': round(data['data']['electricfee'], 2),
                    'waterfee': round(data['data']['waterfee'], 2),
                    'internetfee': round(data['data']['internetfee'], 2),
                    'carmotorparkingfee': round(data['data']['motorcarparkingfee'], 2),
                    'total': round(data['data']['total'], 2)
                })
    if users_data:
        return jsonify(users_data)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_user_month_data', methods=['POST'])
def get_user_month_data():
    month = request.args.get('month')
    user_id = request.args.get('userId')
    user = db['User'].find_one({"_id": user_id})
    month_data = []
    if user:
        for data in user['monthly_data']:
            if data['month'] == int(month):
                month_data.append({
                    '_id': user['_id'],
                    'name': user['name'],
                    'roomfee': round(data['data']['roomfee'], 2),
                    'status': data['data']['status'],
                    'electricfee': round(data['data']['electricfee'], 2),
                    'waterfee': round(data['data']['waterfee'], 2),
                    'internetfee': round(data['data']['internetfee'], 2),
                    'carmotorparkingfee': round(data['data']['motorcarparkingfee'], 2),
                    'total': round(data['data']['total'], 2)
                })
    return jsonify(month_data)

@app.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user_password = db['User'].find_one({"_id": password})
    admin_email = "admin@gmail.com"
    admin_password = "admin@123"
    user_email = "bluemoon@gmail.com"
    try:
        if (email == admin_email and password == admin_password):
            return jsonify({"role": "admin", "message": "Admin login successful"}), 200
        if user_password and user_email == email:
            return jsonify({"role": "user", "message": "User login successfuly"}), 201
        return jsonify({"message": "Email or Password is incorrect"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/update_fee', methods=['POST'])
def update_user_fee():
    data = request.get_json()
    user_id = data['userId']
    electric_fee = data['electricFee']
    water_fee = data['waterFee']
    month = data['month']
    status = data['status']
    parking_fee = data['parkingFee']
    internet_fee = data['internetFee']
    water_usage = data['waterUsage']
    electric_usage = data['electricUsage']
    
    try:
        user = db['User'].find_one({"_id": user_id})
        if user:
            monthly_data = user["monthly_data"]
            month_data = next((md for md in monthly_data if md["month"] == month), None)
            if month_data:
                room_fee = month_data["data"]["roomfee"]
                total = room_fee + water_fee + electric_fee + parking_fee + internet_fee
                db['User'].update_one(
                    {"_id": user_id, "monthly_data.month": month},
                    {"$set": {
                        f"monthly_data.$.data.waterfee": water_fee,
                        f"monthly_data.$.data.electricfee": electric_fee,
                        f"monthly_data.$.data.total": total,
                        f"monthly_data.$.data.internetfee": internet_fee,
                        f"monthly_data.$.data.motorcarparkingfee": parking_fee,
                        f"monthly_data.$.data.status": status,
                        f"monthly_data.$.data.waterusage": water_usage,
                        f"monthly_data.$.data.electricusage": electric_usage
                    }}
                )
                return jsonify({'success': True}), 200
            else:
                return jsonify({'error': 'Month data not found'}), 404
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/status_payment_change', methods = ['POST'])
def status_payment_change():
    data = request.get_json()
    userId = data['userId']
    status = data['status']
    month = data['month']

    if not all([userId]):
        return jsonify ({'error': 'Missing required fields'}), 400
    
    try:
        user = db['User'].find_one({"_id": userId})
        if user:
            monthly_data = user["monthly_data"]
            month_data = next((md for md in monthly_data if md["month"] == month), None)
            if month_data:
                db['User'].update_one(
                    {"_id": userId, "monthly_data.month": month},
                    {"$set": {
                        f"monthly_data.$.data.status": status
                    }}
                )
                return jsonify({'success': True}), 200
            else:
                return jsonify({'error': 'Month data not found'}), 404

        else:
            return jsonify({'error': 'User Id not existes'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/reset_user', methods = ['POST'])
def reset_user():
    data = request.get_json()
    userId = data['userId']
    month = data['month']

    if not all([userId]):
        return jsonify ({'error': 'Missing required fields'}), 400
    
    try:
        user = db['User'].find_one({"_id": userId})
        if user:
            monthly_data = user["monthly_data"]
            month_data = next((md for md in monthly_data if md["month"] == month), None)
            if month_data:
                db['User'].update_many(
                    {"_id": userId, "monthly_data.month": month},
                    {"$set": {
                        f"monthly_data.$.data.waterfee": 0,
                        f"monthly_data.$.data.electricfee": 0,
                        f"monthly_data.$.data.total": 0,
                        f"monthly_data.$.data.internetfee": 0,
                        f"monthly_data.$.data.motorcarparkingfee": 0,
                        f"monthly_data.$.data.status": '',
                        f"monthly_data.$.data.waterusage": 0,
                        f"monthly_data.$.data.electricusage": 0
                    }}
                )
                return jsonify({'success': True}), 200
            else:
                return jsonify({'error': 'Month data not found'}), 404

        else:
            return jsonify({'error': 'User Id not existes'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)