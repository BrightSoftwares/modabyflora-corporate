# -*- coding: utf-8 -*-
import re
# import unidecode
import json, os

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)

json_file = "_data/products1.json"

# Load json file
with open(json_file, "r") as infile:
    prds = json.loads(infile.read())

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
        f.writelines('title: "{}"\n'.format(product['title']))
        f.writelines('description: "{}"\n'.format(product['description'].replace("\n", " ")))
        f.writelines('size: "{}"\n'.format(product['size']))
        f.writelines('brand: "{}"\n'.format(product['brand']))
        f.writelines('label: "{}"\n'.format(product['label']))
        f.writelines('price_numeric: "{}"\n'.format(product['price_numeric']))
        f.writelines('price_numeric_discounted: "{}"\n'.format(product['price_numeric']))
        f.writelines('currency: "{}"\n'.format(product['currency']))
        f.writelines('user_updated_at_ts: "{}"\n'.format(product['user_updated_at_ts']))
        f.writelines('category: "{}"\n'.format(""))
        f.writelines('isdiscounted: "{}"\n'.format(False))
        f.writelines('isnew: "{}"\n'.format(True))
        f.writelines('isbestseller: "{}"\n'.format(False))

        # f.writelines('image_main: "{}"\n'.format(product['currency']))
        images = "images: ["
        for photo in product['photos']:
            images += ' "{}",'.format(photo['url'])

        # Remove the last , character
        images = images[:-1]
        images += " ]\n"
        f.writelines(images)
        f.writelines("---")
