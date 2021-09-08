def isPrime(a):
    i = 2
    while i <= i/2:
        if a % i == 0:
            return False
        i += 1
    return True

A = int(input('a = '))
if isPrime(A):
    print("소수 O")
else:
    print("소수 X")