## 虚拟环境
Python 3.3 以上内置venv 模块,在虚拟环境中，你可以使用 pip 来安装所需的库和依赖项。这些库将在虚拟环境中独立存在，不会影响全局 Python 安装。
## 创建虚拟环境
`python -m venv myenv`

## 激活虚拟环境
在 macOS 和 Linux 中： `source myenv/bin/activate`
在 Windows 中：`myenv\Scripts\activate`

## 退出虚拟环境
`deactivate`

## 查看可用的 Python 版本列表：
`pyenv install --list`

## 安装
`pyenv install 3.9.6`

## 配置全局 Python 版本：
`pyenv global 3.9.6`

## 针对特定项目配置 Python 版本（在项目目录中）
`pyenv local 3.9.6`

## 查看已安装的 Python 版本：
`pyenv versions`

## 删除已安装的 Python 版本：
`pyenv uninstall <version>`
