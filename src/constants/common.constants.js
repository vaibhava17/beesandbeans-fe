export const DATE_FORMAT = "DD/MM/YYYY";

export const sortMenu = [
  {
    key: 1,
    field: "createdAt",
    order: "desc",
    label: "Latest"
  },
  {
    key: 2,
    field: "updatedAt",
    order: "desc",
    label: "Popular"
  },
  {
    key: 3,
    field: "price",
    order: "asc",
    label: "By Price (Low to High)"
  },
  {
    key: 4,
    field: "price",
    order: "desc",
    label: "By Price (High to Low)"
  },
  {
    key: 5,
    field: "likes",
    order: "desc",
    label: "By Likes"
  }
]