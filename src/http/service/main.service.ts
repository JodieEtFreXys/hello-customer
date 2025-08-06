import prisma from "../../global/prisma";

interface HelloResponse {
    id: number;
    name: string;
    favorite_item?: string;
}

class MainService {
    public async findHello(): Promise<HelloResponse[]> {
        try {
            const hellos = await prisma.main_table.findMany();

            if (!hellos.length) {
                throw new Error('Hello, It seems that we are not open yet since we have no customer#400')
            }

            const result: HelloResponse[] = [];
            for (const hello of hellos) {
                result.push({
                    id: hello.id,
                    name: hello.name
                });
            }

            return result;
        } catch (error: unknown) {
            throw error;
        }
    }

    public async findHelloById(id: number): Promise<HelloResponse> {
        try {
            const hello = await prisma.main_table.findFirst({
                where: {
                    id: id,
                }
            });

            if (!hello) {
                throw new Error('Oh it seems we cant find you in our list, would you consider registering?#400')
            }

            return {
                id: hello.id,
                name: hello.name,
                favorite_item: hello.favorite_item || undefined,
            };
        } catch (error: unknown) {
            throw error;
        }
    }

    public async createCustomer(name: string, favoriteItem?: string): Promise<any> {
        try {
            const customerPromise = prisma.main_table.create({
                data: {
                    name: name,
                    favorite_item: favoriteItem || null,
                }
            });

            const createCustomer = await prisma.$transaction([
                customerPromise,
            ]);

            return createCustomer;
        } catch (error: any) {
            throw error;
        }
    }

    public async patchFavoriteItem(id: number, favoriteItem?: string): Promise<any> {
        try {
            const customer = await prisma.main_table.findFirst({
                where: {
                    id: 1,
                }
            });

            if (!customer) {
                throw new Error('Oh it seems we cant find you in our list, would you consider registering?#400');
            }

            const favItemPromise = prisma.main_table.update({
                where: {
                    id: customer.id,
                },
                data: {
                    favorite_item: favoriteItem,
                }
            });

            const updateFavItem = await prisma.$transaction([
                favItemPromise,
            ]);

            return updateFavItem;
        } catch (error: any) {
            throw error;
        }
    }
}

export const mainService = new MainService();