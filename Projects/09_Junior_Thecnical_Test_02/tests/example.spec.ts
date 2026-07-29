import { test, expect } from '@playwright/test';

const validSearchTest = "Star Wars"
const invalidSeachTest = "dsoiccdmk"
const localHost = 'http://localhost:5173/'
const API_KEY = '26060f05'
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${validSearchTest}`

test('get a valid movie search', async ({ page }) => {
  await page.goto(localHost);

  await page.getByTestId('search-input').fill(validSearchTest)
  await page.waitForTimeout(1000);
  await page.getByTestId('search-button').click()
  const movieList = page.getByTestId('movie-list')
  const posters = page.getByTestId('movie-poster')
  await expect(movieList).toBeVisible()
  await expect(posters.first()).toBeVisible()
  await expect(movieList).toContainText(validSearchTest)

});


test('get a invalid movie search', async ({ page }) => {
   await page.goto(localHost);

    await page.getByTestId('search-input').fill(invalidSeachTest)
    await page.waitForTimeout(1000);
    await page.getByTestId('search-button').click()
    const error = page.getByTestId('no-movies-result')
    await expect(error).toBeVisible()
    await expect(error).toContainText('No se ha encontrado ninguna coincidencia')

})

test('get sorted movies alphabetly', async ({ page }) => {
   await page.goto(localHost);

    await page.getByTestId('search-input').fill(validSearchTest)
    await page.getByTestId('sort-checkbox').check()
    await page.waitForTimeout(1000);
    await page.getByTestId('search-button').click()
    const titles = await page.getByTestId('movie-title').allInnerTexts()
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b, 'es'))
    await expect(titles).toEqual(sortedTitles)

}) 