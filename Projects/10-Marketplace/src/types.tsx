export type ProductList = {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}

export type Product = {
    id:                   number;
    title:                string;
    description:          string;
    category:             Category;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand?:               string;
    sku:                  string;
    weight:               number;
    dimensions:           Dimensions;
    warrantyInformation:  string;
    shippingInformation:  string;
    availabilityStatus:   AvailabilityStatus;
    reviews:              Review[];
    returnPolicy:         ReturnPolicy;
    minimumOrderQuantity: number;
    meta:                 Meta;
    images:               string[];
    thumbnail:            string;
}

export type AvailabilityStatus = "In Stock" | "Low Stock";

export type Category = "beauty" | "fragrances" | "furniture" | "groceries" | "all";

export const PRODUCT_CATEGORY = {
    beauty: 'beauty',
    fragrances: 'fragrances',
    furniture: 'furniture',
    groceries: 'groceries',
    all: 'all'
}

export type Dimensions = {
    width:  number;
    height: number;
    depth:  number;
}

export type Meta = {
    createdAt: string;
    updatedAt: string;
    barcode:   string;
    qrCode:    string;
}

export type ReturnPolicy = 
    "No return policy" | 
    "7 days return policy" | 
    "90 days return policy" | 
    "60 days return policy" | 
    "30 days return policy";

export type Review = {
    rating:        number;
    comment:       string;
    date:          string;
    reviewerName:  string;
    reviewerEmail: string;
}

export type Filter = {
    category: Category,
    maxPrice: number
}