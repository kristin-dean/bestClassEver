import random

def randomStudent(name,fout,mean,sig):
    f.write(name)
    for i in range(20):
        score = round(random.normalvariate(mean,sig))
        score = max(0,min(score,100));
        f.write(","+str(score))
    f.write("\n")



f = open("gradeData.csv","w")

f.write("Student")
for x in range(20):
    f.write(", {0}".format(x))

f.write("\n")

randomStudent("Fred",f,60,15)
randomStudent("Sally",f,75,10)
randomStudent("Karl",f,35,40)
randomStudent("Nancy",f,90,5)

f.close()
