require('zy-fetch')
var china = require('china-area-data')

/**
 * 直辖市
 */
var municipality = ['北京', '天津', '上海', '重庆']

/**
 * 自治区
 */
var area = ['内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区']

var provinceCode = '86'

/**
 * 获取所有省份
 * @param isSimplify 是否简化名称
 * @returns {{}}
 */
function getProvinces(isSimplify) {
  var province = china[provinceCode]
  var obj = {}
  for (var key in province) {
    var name = province[key]
    obj[isSimplify ? simplifyProvinceName(name) : name] = key
  }
  return obj
}

/**
 * 获取直辖市
 * @param isSimplify 是否简化名称
 * @returns {Array}
 */
function getMunicipality(isSimplify) {
  if (isSimplify) {
    return municipality.map(function (name) {
      return simplifyProvinceName(name)
    })
  }
  return municipality
}

/**
 * 获取自治区
 * @param isSimplify 是否简化名称
 * @returns {Array}
 */
function getArea(isSimplify) {
  if (isSimplify) {
    return area.map(function (name) {
      return simplifyProvinceName(name)
    })
  }
  return area
}


/**
 * 获取省份名称
 * @param isSimplify 是否简化
 * @returns {Array}
 */
function getProvinceName(isSimplify) {
  var province = china['86']
  var nameArray = []
  for (var key in province) {
    var name = province[key]
    nameArray.push(isSimplify ? simplifyProvinceName(name) : name)
  }
  return nameArray
}

/**
 * 补全省份名称
 * 上海 -> 上海
 * 广东 -> 广东省
 * 内蒙古 -> 内蒙古自治区
 * @param provinceName
 * @returns {*}
 */
function completeProvince(provinceName) {
  if (!provinceName) {
    return provinceName
  }
  var isMunicipality = municipality.some(function (name) {
        return provinceName === name
      }
  )
  if (isMunicipality) {
    return provinceName.replace('市', '') + '市'
  }

  var isArea = false
  area.forEach(function (name) {
    if (!isArea && name.indexOf(provinceName) !== -1) {
      isArea = true
      provinceName = name
    }
  })
  if (!isArea) {
    return provinceName.replace('省', '') + '省'
  }
  return provinceName
}


/**
 * 简化省份
 * 上海 -> 上海
 * 广东省 -> 广东
 * 内蒙古自治区 -> 内蒙古
 * @param provinceName
 * @returns {*}
 */
function simplifyProvinceName(provinceName) {
  if (!provinceName) {
    return provinceName
  }
  provinceName = provinceName.replace('省', '')

  if (~area[0].indexOf(provinceName)) {
    return provinceName.substring(0, 3)
  } else {
    return provinceName.substring(0, 2)
  }
}


/**
 * 获取省份编码
 * @param provinceName 省份名
 * @returns {*}
 */
function getProvinceCode(provinceName) {
  provinceName = completeProvince(provinceName)
  var provinces = getProvinces(false)
  return provinces[provinceName]
}

/**
 * 获取省份名称
 * @param provinceCode 省份编码
 * @param isSimplify 是否简化
 * @returns {*}
 */
function getProvinceName(provinceCode, isSimplify) {
  var provinces = china[provinceCode]
  return isSimplify ? simplifyProvinceName(provinces[provinceCode]) : provinces[provinceCode]
}


/**
 * 获取某省地级市
 * @param provinceName
 * @returns {Array}
 */
function getPrefecturalLevelCity(provinceName) {
  if (!provinceName) {
    return []
  }
  var code = getProvinceCode(provinceName)
  return china[code]
}

console.info(getPrefecturalLevelCity('湖南'))

/**
 * 简化市名
 * @param cityName
 * @returns {XML|void|string|*}
 */
function simplifyCityName(cityName) {
  if (!cityName) {
    return cityName
  }
  cityName = cityName.replace('市', '')
  return cityName
}