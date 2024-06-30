# linux 重置 docker

1, 重启 Docker：

```
sudo systemctl restart docker
```



2, 更新 Docker Compose：

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3, 清除Docker缓存：

```
sudo docker system prune
```

4, 重新拉去镜像：

```
sudo docker-compose pull
```

5, 重新构建：

```
sudo docker-compose build --no-cache
```

6, 查看详细的错误日志： 

​	你可以通过增加 `-verbose` 标志来运行 `docker-compose` 获取更多详细的错误信息：

```
sudo docker-compose up --verbose
```

这条在运行时提示运行不了