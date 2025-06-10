"use client";
import { useSpring, animated } from "@react-spring/web";

const Numero = ({ n }: { n: number }) => {
	const { number } = useSpring({
		from: { number: 0 },
		number: n,
		reset: false,
		delay: 200,
		config: { mass: 1, tension: 20, friction: 10 },
	});

	return <animated.div>{number.to((n: number) => n.toFixed(0))}</animated.div>;
};

export default Numero;
