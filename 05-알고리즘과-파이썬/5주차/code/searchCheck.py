class node:
    def __init__(self, key=None):
        self.key = key

class sequentialSearch_Dict:
    def __init__(self):
        sequentialSearch_Dict.a = []

    # def sequentialSearch(self, search_key):
    #     for i in range(len(Dict.a)):
    #         if Dict.a[i].key == search_key:
    #             return i
        
    #     return -1
    
    def search(self, search_key):
        i = 0
        n = len(sequentialSearch_Dict.a)
        while i < n and sequentialSearch_Dict.a[i].key != search_key:
            i += 1
        if i == n:
            return -1
        else:
            return i
    
    def insert(self, v):
        sequentialSearch_Dict.a.append(node(v))

class binarySearch_Dict:
    def __init__(self):
        binarySearch_Dict.a = []
    
    def Search(self, search_key):
        left = 0
        right = len(binarySearch_Dict.a) - 1
        while left <= right:
            mid = int((left + right) / 2)
            if binarySearch_Dict.a[mid].key == search_key:
                return mid
            if binarySearch_Dict.a[mid].key > search_key:
                right = mid - 1
            else:
                left = mid + 1

        return -1
    
    def insert(self, v):
        binarySearch_Dict.a.append(node(v))

class node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

class binaryTreeSearch_Dict:
    x = p = node

    z = node(key=0, left=0, right=0)
    z.left = z
    z.right = z
    head = node(key=0, left=0, right=z)

    def search(self, search_key):
        x = self.head.right
        while x != self.z:
            if x.key == search_key:
                return x.key
            if x.key > search_key:
                x = x.left
            else:
                x = x.right
        return -1
    
    def insert(self, v):
        x = p = self.head
        while x != self.z:
            p = x
            if x.key == v:
                return
            if x.key > v:
                x = x.left
            else:
                x = x.right
        x = node(key=v, left=self.z, right=self.z)
        if p.key > v:
            p.left = x
        else:
            p.right = x

import random, time

N = 30000
key = list(range(1, N + 1))
s_key = list(range(1, N + 1))

random.shuffle(key)

d = binaryTreeSearch_Dict()
for i in range(N):
    d.insert(key[i])

start_time = time.time()
for i in range(N):
    result = d.search(s_key[i])
    if result == -1 or result != s_key[i]:
        print("탐색 오류", result)
end_time = time.time() - start_time

print("이진 트리 탐색의 실행 시간 (N=%d) : %0.3f"%(N, end_time))
print("탐색 완료")