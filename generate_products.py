import json, os

json_file = "_data/products1.json"

# Load json file
with open(json_file, "r") as infile:
    prds = json.loads(infile.read())

# prds = json.loads(data)

# Generate the jekyll compatible files
destination_folder = "_products"
for product in prds:
    # print(product)
    current_file = os.path.join(destination_folder, "{}.md".format(product['title']))
    print("Writing file", current_file)
    with open(current_file, "w") as f: 
        f.writelines("---\n")
        f.writelines("layout: product-page\n")
        f.writelines("id: {}\n".format(product['id']))
        f.writelines("title: {}\n".format(product['title']))
        f.writelines("---")
