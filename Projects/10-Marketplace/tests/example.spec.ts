import { test, expect } from '@playwright/test';

const localHost = 'http://localhost:5173/'

test('filter products by categoy', async ({ page }) => {
  await page.goto(localHost); 

  await expect.poll(async () => {
    return await page.getByRole('img').count()
  }).toBeGreaterThan(2)

  const expectedCategory = 'beauty'
  const filter = await page.getByRole('combobox', {name: 'Category'})
  await filter.selectOption(expectedCategory.toUpperCase())
  await expect(filter).toHaveValue(expectedCategory)

  const productList = page.getByRole('listitem')
  const categories = await productList.evaluateAll(
    products => products.map(item => item.getAttribute('data-category'))
  )
  const filteredProducts = categories.every(cat => cat === expectedCategory); 
  expect(filteredProducts).toBe(true)


});
