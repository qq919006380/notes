#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github pages
echo 'weibaichao.com' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:qq919006380/notes.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://xugaoyi:${GITHUB_TOKEN}@github.com/qq919006380/notes.git
  git config --global user.name "qq919006380"
  git config --global user.email "919006380@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl main:gh-pages # 推送到github gh-pages分支

## 回到上一个工作目录
cd -

## 删除dist文件夹
rm -rf docs/.vuepress/dist
