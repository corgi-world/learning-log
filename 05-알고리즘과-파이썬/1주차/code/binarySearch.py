def binarySearch(a, key, left, right):
    print('key =', key, end='')
    if (left <= right):
        mid = int((left + right) / 2)
        print(', mid =', mid, end='')
        if (key == a[mid]):
            print()
            return mid
        elif (key < a[mid]):
            print(', left =', left, end='')
            print(', right =', mid - 1)
            return binarySearch(a, key, left, mid - 1)
        elif (key > a[mid]):
            print(', left =', mid + 1, end='')
            print(', right =', right)
            return binarySearch(a, key, mid + 1, right)
    else: return -1

key = 64
a = list(range(0, 101))

print('key =', key)
index = binarySearch(a, 64, 0, len(a) - 1)
print(a[index])