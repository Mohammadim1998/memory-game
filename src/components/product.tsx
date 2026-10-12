"use client";
import { useEffect, useState } from "react";

const Product = () => {
    const [showPic, setShowPic] = useState<string>('');

    const [shuflledArr, setShuflledArr] = useState<string[]>([]);
    const [endtime, setEndTime] = useState<number>(120);
    const [movement, setMovement] = useState<number>(40);

    const numbers = [
        { id: 1, title: "product-1", visible: false },
        { id: 2, title: "product-2", visible: false },
        { id: 3, title: "product-3", visible: false },
        { id: 4, title: "product-4", visible: false },
        { id: 5, title: "product-5", visible: false },
        { id: 6, title: "product-6", visible: false },
        { id: 7, title: "product-7", visible: false },
        { id: 8, title: "product-8", visible: false },

        { id: 9, title: "product-8", visible: false },
        { id: 10, title: "product-7", visible: false },
        { id: 11, title: "product-6", visible: false },
        { id: 12, title: "product-5", visible: false },
        { id: 13, title: "product-4", visible: false },
        { id: 14, title: "product-3", visible: false },
        { id: 15, title: "product-2", visible: false },
        { id: 16, title: "product-1", visible: false },
    ];
    const allProducts = [...numbers]

    function shuffle(arr) {
        let currentIndex = arr.length;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    }

    useEffect(() => {
        setShuflledArr(shuffle(allProducts))
    }, [])

    function handleShowPic(id: string) {
        allProducts.map((product) => {

            if (product.id === id) {
                setShuflledArr((prev) => 
                    prev.map((item) => {
                        if (item.id === id) {
                            return { ...item, visible: true }
                        }
                        return item;
                    })

                )
            }
            // setShowPic()
        })
    }

    return (
        <>
            <div className="flex justify-between items-center px-4">
                <span className="bg-white rounded px-4 py-2 flex justify-center items-center mx-auto text-2xl text-blue-600 font-bold">{endtime / 60}:زمان</span>
                <span className="bg-white rounded px-4 py-2 flex justify-center items-center mx-auto text-2xl text-blue-600 font-bold">{movement}:تعداد حرکت</span>
            </div>

            <div className="w-full h-full grid grid-cols-4 gap-1 justify-center items-center">
                {shuflledArr.map((item) => (
                    <div key={item.id} className="relative bg-pink-500 rounded shrink-0 flex w-25 h-25 justify-center items-center">
                        {item.title}
                        <div onClick={() => handleShowPic(item.id)}
                            className={`absolute ${item.visible ? 'opacity-100' : 'opacity-0'} transition-all duration-300 inset-0`}>
                            <img src={`/images/${item.title}.jpg`} className="w-full h-full" alt="" />
                        </div>
                    </div>
                ))}

                <button onClick={() => setShowPic("")} className="bg-white rounded px-4 py-2 flex justify-center items-center mx-auto text-2xl text-blue-600 font-bold">شروع بازی</button>
            </div>
        </>
    )
}

export default Product;