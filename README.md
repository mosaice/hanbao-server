
[![Build Status](https://travis-ci.org/mosaice/hanbao-server.svg?branch=master)](https://travis-ci.org/mosaice/hanbao-server)
[![Coverage Status](https://coveralls.io/repos/github/mosaice/hanbao-server/badge.svg?branch=master)](https://coveralls.io/github/mosaice/hanbao-server?branch=master)
[![node](https://img.shields.io/badge/node-%3E%3D8.0.0-green.svg)](https://nodejs.org)
_____

<p align="center">
  <img src="public/images/hanbao.png" alt="Hanbao Logo" /></a>
</p>

- [介绍](#介绍)
- [依赖](#依赖)
- [安装](#安装)
- [使用](#使用)

____

### 介绍

Hanbao 是一个利用 [Nest](https://github.com/nestjs/nest) 构建的后端服务项目

### 依赖

#### 需要安装的服务
项目中使用 [typeorm](https://github.com/typeorm/typeorm) 作为ORM连接数据库，默认使用的 `mysql` 作为数据库，你可以在这里查看如何 [使用其他数据库](http://typeorm.io/#/connection-options)

在启动项目之前你需要先确保本地已经安装好 `mysql` 和 `redis` 并且启动服务, 你可以在 [这里](https://github.com/mosaice/hanbao-server/blob/master/ORM/config.ts) 修改 `mysql` 的连接配置

#### 数据库

启动时会默认连接 `mysql` 的 `hanbao` 数据库， 在测试时会连接 `hanbaoTest` 

如果你是第一次启动必须先初始化数据库

```sql
CREATE DATABASE IF NOT EXISTS hanbao default character set utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS hanbaoTest default character set utf8mb4 collate utf8mb4_unicode_ci;
```

### 安装

```bash
$ git clone https://github.com/mosaice/hanbao-server.git
$ cd hanbao-server
$ npm install
```

### 使用

```bash
$ npm start
```



