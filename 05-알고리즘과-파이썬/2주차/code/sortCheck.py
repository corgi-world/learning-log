def selectionSort(a, n):
    for i in range(1, n):
        minIndex = i
        for j in range(i + 1, n + 1):
            if a[j] < a[minIndex]:
                minIndex = j
        a[minIndex], a[i] = a[i], a[minIndex]

def bubbleSort(a, n):
    for i in range(1, n):
        for j in range(1, n - i + 1):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]

def insertionSort(a, n):
    for i in range(2, n + 1):
        v = a[i]
        j = i
        while j-1 > 0 and a[j-1] > v:
            a[j], a[j-1] = a[j-1], a[j]
            j -= 1
        a[j] = v

def shellSort(a, n):
    h = 1
    while h < n:
        h = 3 * h + 1
    while h > 0:
        for i in range(h + 1, n + 1):
            v = a[i]
            j = i
            while j > h and a[j-h] > v:
                a[j] = a[j-h]
                j -= h
            a[j] = v
        h = int(h / 3)

def quickSort(a, l, r):
    if r > l:
        v, i, j = a[r], l-1, r
        while True:
            i += 1
            while a[i] < v:
                i += 1
            j -= 1
            while a[j] > v:
                j -=1
            if i >= j:
                break
            a[i], a[j] = a[j], a[i]
        a[i], a[r] = a[r], a[i]
        quickSort(a, l, i-1)
        quickSort(a, i+1, r)

################################################

import random, time
import sys
sys.setrecursionlimit(10000)

def checkSort(a, n):
    isSorted = True
    for i in range(1, n):
        if a[i] > a[i+1]:
            isSorted = False
        if not isSorted:
            break
    if isSorted:
        print("정렬 완료")
    else:
        print("정렬 오류 발생")

N = 300000

a = []
a.append(None)
for i in range(N):
    a.append(random.randint(1, N))

start_time = time.time()
quickSort(a, 1, N)
end_time = time.time() - start_time
print("선택 정렬의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
checkSort(a, N)

# a = []
# a.append(None)
# for i in range(N):
#     a.append(random.randint(1, N))

# start_time = time.time()
# selectionSort(a, N)
# end_time = time.time() - start_time
# print("선택 정렬의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
# checkSort(a, N)

# a = []
# a.append(None)
# for i in range(N):
#     a.append(random.randint(1, N))

# start_time = time.time()
# bubbleSort(a, N)
# end_time = time.time() - start_time
# print("버블 정렬의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
# checkSort(a, N)

# a = []
# a.append(None)
# for i in range(N):
#     a.append(random.randint(1, N))

# start_time = time.time()
# insertionSort(a, N)
# end_time = time.time() - start_time
# print("삽입 정렬의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
# checkSort(a, N)

# a = []
# a.append(None)
# for i in range(N):
#     a.append(random.randint(1, N))

# start_time = time.time()
# shellSort(a, N)
# end_time = time.time() - start_time
# print("쉘 정렬의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
# checkSort(a, N)