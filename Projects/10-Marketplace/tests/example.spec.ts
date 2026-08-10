import { test, expect } from '@playwright/test';

const localHost = 'http://localhost:5173/'

test('filter products by categoy', async ({ page }) => {
  await page.goto(localHost); 

  await expect.poll(async () => {
    return await page.getByRole('img').count()
  }).toBeGreaterThan(2)
  // esperar que se vean al menos dos imagenes 

  const expectedCategory = 'beauty'
  const filter = await page.getByRole('combobox', {name: 'Category'})
  await filter.selectOption(expectedCategory.toUpperCase())
  await expect(filter).toHaveValue(expectedCategory)

  const productList = page.getByRole('listitem')
  const count = await productList.count();

  for (let i = 0; i < count; i++) {
    await expect(productList.nth(i)).toHaveAttribute('data-category', expectedCategory);
  }

  // La propiedad o método .nth(index) de un Locator en Playwright sirve para seleccionar un elemento específico dentro de un grupo de varios elementos coincidentes, basándose en su posición de índice (empezando desde 0).

  
  // const categories = await productList.evaluateAll(
  //   products => products.map(item => item.getAttribute('data-category'))
  // )
  // const filteredProducts = categories.every(cat => cat === expectedCategory); 
  // expect(filteredProducts).toBe(true)


});


test('filter products by price', async ({ page }) => {
  await page.goto(localHost); 

  //esperar que se vean al menos dos imágenes 
  await expect.poll(async () => {
    return await page.getByRole('img').count()
  }).toBeGreaterThan(2)

  const expectedPrice = 50
  const filter = await page.getByRole('slider', {name: 'Max Price'}).fill(expectedPrice.toString())
  const productList = page.getByRole('listitem')

  await expect.poll(async () =>{
    const prices = productList.evaluateAll(items => 
      items.map(item => Number(item.getAttribute('data-price')))
    ); 
    return (await prices).every(price => price <= expectedPrice)
  }).toBe(true)

})