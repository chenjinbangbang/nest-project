
// 使用getRawMany()方法时，删除所有原始数据
export function removeRawMany(list: Array<any> = [], alias: string = '') {
  list.forEach((item) => {
    for (let key in item) {
      if (key.includes(alias)) {
        delete item[key];
      }
    }
  })
}