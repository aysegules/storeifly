import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../errors/AppError";

const getCategoriesByStore = async () => {};

const createCategory = async ({ id, name }: { id: string; name: string }) => {
  const store = await prisma.store.findFirst({
    where: { vendorId: id },
  });

  if (!store) {
    throw new AppError("Store not found", 404);
  }

  const slug = name
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  const category = await prisma.category.create({
    data: {
      storeId: store.id,
      name,
      slug,
    },
  });

  return category;
};

const deleteCategory = async () => {};

export { getCategoriesByStore, createCategory, deleteCategory };
