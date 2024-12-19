import requests
import json
import os 

cur_dir = os.path.dirname(__file__)
with open(os.path.join(cur_dir, "data.json")) as file:
    productsJson = json.load(file)
    for product in productsJson:
        del(product['id'])
        print(product)
        resp = requests.post("http://localhost:3001/api/products", json=product)
        print(resp)
        