# -*- coding: utf-8 -*-
import re
# import unidecode
import json, os, urllib.request

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)




# json_file = "_data/products1.json"

# # Load json file
# with open(json_file, "r") as infile:
#     prds = json.loads(infile.read())

# Fetch the products from the api
with urllib.request.urlopen("http://whatsappecommerce.herokuapp.com/api/items/?limit=100") as url:
    api_json = json.loads(url.read().decode())
    prds = api_json['results']
    print(prds)

# prds = json.loads(data)

# Generate the jekyll compatible files
destination_folder = "_products"
for product in prds:
    # print(product)
    current_file = os.path.join(destination_folder, "{}.md".format(slugify(product['title'])))
    print("Writing file", current_file)
    with open(current_file, "w") as f: 
        f.writelines("---\n")
        f.writelines('layout: "product-page"\n')
        f.writelines('id: "{}"\n'.format(product['id']))
        f.writelines('product_id: "{}"\n'.format(product['id']))
        f.writelines('external_product_id: "{}"\n'.format(product['external_product_id']))
        f.writelines('title: "{}"\n'.format(product['title']))
        f.writelines('description: "{}"\n'.format(product['description'].replace("\n", " ")))
        f.writelines('size: "{}"\n'.format(""))
        f.writelines('brand: "{}"\n'.format(""))
        f.writelines('label: "{}"\n'.format(product['label']['name']))
        f.writelines('price_numeric: "{}"\n'.format(product['price']))
        f.writelines('price_numeric_discounted: "{}"\n'.format(product['discount_price']))
        f.writelines('currency: "{}"\n'.format("€"))
        f.writelines('user_updated_at_ts: "{}"\n'.format(""))
        f.writelines('category: "{}"\n'.format(product['category']['name']))
        f.writelines('isdiscounted: "{}"\n'.format(False))
        f.writelines('isnew: "{}"\n'.format(True))
        f.writelines('isbestseller: "{}"\n'.format(False))

        
        # images = "images: ["
        # for photo in product['photos']:
        #     images += ' "{}",'.format(photo['url'])

        # # Remove the last , character
        # images = images[:-1]
        # images += " ]\n"

        image = product['external_image']
        if image == "":
            image = product['image']

        images = "images: [ \"{}\" ]\n".format(image)

        f.writelines(images)
        f.writelines("---")
