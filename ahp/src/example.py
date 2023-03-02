def adder(a,b):
    def realAdder(a,b):
        print(a+b)
    return realAdder

adder(1,2)