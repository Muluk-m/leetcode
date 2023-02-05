# Git

## 1.  RPC failed

```bash
Enumerating objects: 71, done.
Counting objects: 100% (71/71), done.
Delta compression using up to 8 threads
Compressing objects: 100% (37/37), done.
Writing objects: 100% (39/39), 9.61 KiB | 4.80 MiB/s, done.
Total 39 (delta 23), reused 0 (delta 0), pack-reused 0
error: RPC failed; HTTP 500 curl 22 The requested URL returned error: 500
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
```

解决

```shell
git config --global http.version HTTP/1.1
```
