type DeepReadonly<T> = T extends (infer R)[]
	? ReadonlyArray<DeepReadonly<R>>
	: T extends Function
	? T
	: T extends object
	? DeepReadonlyObject<T>
	: T;

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

const guard = <T, Err extends Error>({
	value,
	error,
}: Readonly<{
	value: T;
	error: () => Err;
}>) => {
	const t = value;
	if (t !== undefined && t != null) {
		return t;
	}
	throw error();
};

export { guard };

export type { DeepReadonly, DeepReadonlyObject };
