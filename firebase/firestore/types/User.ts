export type CreateUserInput = {
	firstName: string;
	middleName: string;
	lastName: string;
	updatedAt?: Date;
};

export type User = CreateUserInput & {
	id: string;
	createdAt: Date;
};
