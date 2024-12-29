from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['BLUEMOON']
collection = db['User']

names = ["John", "Joe", "Melin", "Justin", "Bob", "Jane", "Jam", "Turu", "Irin", "Top"]
email = ["John001@gmail.com",
         "Joe002@gmail.com",
         "Melin003@gmail.com",
         "Justin004@gmail.com",
         "Bob005@gmail.com",
         "Jane006@gmail.com",
         "Jam007@gmail.com",
         "Turu008@gmail.com",
         "Irin009@gmail.com",
         "Top0010@gmail.com"
        ]
room_areas = [20, 15, 30, 10, 25, 40, 12, 18, 22, 35]
room_number = [101, 104, 105, 109, 111, 210, 215, 313, 412, 322]

room_fees = []
for i in range(len(room_number)):
    fee = round(room_areas[i] * 1.4662, 2)
    room_fees.append(fee)
print(room_fees)

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

def add_monthly_data(user_id, month, data):
    collection.update_one(
        {"_id": user_id},
        {"$push": {
            "monthly_data": {
                "month": month,
                "data": data
            }
        }}
    )
for i in range(1, 11):
    user = create_user(f"00{i}", names[i - 1], email[i - 1], room_number[i - 1], room_areas[i - 1])
    collection.insert_one(user)
    for month in range(1, 13):
        add_monthly_data(f"00{i}", month, {"roomfee": room_fees[i - 1], "status": "", "waterusage": 0, "electricusage": 0, "electricfee": 0, "waterfee": 0, "internetfee": 0, "motorcarparkingfee": 0, "total": 0})
    