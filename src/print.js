export default function printMe() {
	let name = "zzx";
	const arr = [1,2,3,4,5];
	arr.map((item) => {
		console.log(item);

	});
	console.log(name);
	console.log('I get called1122 from print.js!');
}