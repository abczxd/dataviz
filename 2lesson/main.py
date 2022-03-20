import json

with open("my_weather_data.json", "r") as read_file:
    data = json.load(read_file)

print(type(data))
print(len(data))
tempviz=[]
forviz=[]

i=0
while i<len(data):
    tempviz.append(data[i]['humidity'])
    tempviz.append(data[i]['dewPoint'])
    tempviz.append(data[i]['temperatureHigh'])
    i+=1
    forviz.append(tempviz)
    tempviz=[]

with open("forviz.json","w") as fh:
    fh.write(json.dumps(forviz))