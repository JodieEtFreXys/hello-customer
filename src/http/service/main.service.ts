

interface ErrorSampler {
    message: string;
    code: number;
}

class MainService {
    public async findHello(): Promise<void> {
        try {
            
        } catch (error: unknown) {
            throw error;
        }
    }
}