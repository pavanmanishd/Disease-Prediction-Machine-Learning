import pickle
import pandas as pd
import json
import sys

model = pickle.load(open('./model/model.pkl','rb'))
symps = pickle.load(open('./data/symptoms.pkl','rb'))  

f = open('symptoms.txt','r')

sym = f.read().split('-')
sym.pop()

s = []
for i in symps:
    if i in sym:
        s.append(1)
    else:
        s.append(0)
sym = pd.DataFrame(s).T
sym.columns = symps
test_pred = model.predict(sym)
# print(test_pred)
desc_data = pd.read_csv('./data/symptom_Description.csv')
index = desc_data[desc_data["Disease"] == test_pred[0].strip()].index.values
description = desc_data.iloc[index[0]].values
description = description.tolist()

prec_data = pd.read_csv('./data/symptom_precaution.csv')
prec_index = prec_data[prec_data["Disease"] == test_pred[0].strip()].index.values
precaution = prec_data.iloc[prec_index[0]].values
precaution = precaution.tolist()
disease_info = description + precaution[1:]

diagnosis_data = pd.read_csv('./data/Disease_diagnosis.csv')
diagnosis_index = diagnosis_data[diagnosis_data["Disease"] == test_pred[0].strip()].index.values
diagnosis = diagnosis_data.iloc[diagnosis_index[0]].values
diagnosis = diagnosis.tolist()



def isNAN(num):
    return num != num

disease_info = {
    "disease":  test_pred[0].strip(),
    "description": disease_info[1],
    "precaution2": '' if isNAN(disease_info[3]) else disease_info[3],
    "precaution3": '' if isNAN(disease_info[4]) else disease_info[4],
    "precaution4": '' if isNAN(disease_info[5]) else disease_info[5],
    "precaution1": '' if isNAN(disease_info[2]) else disease_info[2],
    "treatment1": '' if isNAN(diagnosis[1]) else diagnosis[1],
    "treatment2": '' if isNAN(diagnosis[2]) else diagnosis[2],
    "treatment3": '' if isNAN(diagnosis[3]) else diagnosis[3],
    "medication1": '' if isNAN(diagnosis[4]) else diagnosis[4],
    "medication2": '' if isNAN(diagnosis[5]) else diagnosis[5],
    "medication3": '' if isNAN(diagnosis[6]) else diagnosis[6],
}
json.dump(disease_info, open('disease_info.json','w'))
print("completed")
sys.stdout.flush()