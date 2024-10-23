import json
import sys

data_f = open(sys.argv[1], "r+")
timecodes_fname = sys.argv[2]

data = json.load(data_f)
timecodes_str = open(timecodes_fname).read()
timecodes_list = [[int(t.split(":")[0])*60 + int(t.split(":")[1]) for t in area.split("\n")] for area in timecodes_str.split("\n\n")]

for i in range(0, len(timecodes_list)):
    id = str(i + 9)
    
    data["blues_metadata"][id] = [dict(blue, **{"subway_circuit_t": timecodes_list[i][blue["mem_num"] - 1]})  for blue in data["blues_metadata"][id]]

data_f.seek(0)
json.dump(data, data_f)
data_f.close()