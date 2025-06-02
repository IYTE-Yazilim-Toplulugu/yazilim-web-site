"use client";

import { Card, CardContent, CardFooter, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import  Image  from "next/image";

export default function Blog() {

    return (
        <main className="min-h-screen pt-16">
            
            <div className="flex flex-col space-y-4 m-10 gap-10 h-200">
                <div className="flex flex-[3] flex ml-12 mr-18 flex-ver border-white border-1 rounded-2xl" >
                    <div className="flex-[1] w-full rounded-2xl relative">
                        <Image
                        src={""}
                        alt={"abcd"}
                        fill
                        className="rounded-2xl"
                        />
                    </div>
                    <div className="flex-[1] w-full">
                        <Card className=" max-w h-full w-full rounded-2xl  ">
                                <CardHeader >
                                    
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>This is a description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae odio beatae, possimus voluptatum unde voluptatibus 
                                        eligendi dicta natus, at aliquam itaque autem? Facere culpa, necessitatibus illo impedit obcaecati architecto mollitia..</p>
                                </CardContent>
                                <CardFooter className="flex flex-ver">
                                    <div className="flex-[1]">
                                    </div>
                                    <div className="flex flex-[1] justify-end">
                                        <button>Read more</button>
                                    </div>         
                                </CardFooter>
                            </Card>
                    </div>

                </div>
                <div className="flex-[4] flex flex-ver ml-12">
                    <div className="flex flex-1 items-center">
                        <Card className="max-w-md h-full w-full rounded-2xl" >
                            <CardHeader>
                                <div className="relative w-full h-50">
                                    
                                    <Image
                                        src={""}
                                        alt={"abcd"}
                                        fill
                                    />
                                </div>
                                <div>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>This is a description</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent >
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem est cupiditate nulla eos, labore ea. 
                                    Odio veritatis natus, vero distinctio eius nulla quaerat animi fuga rerum dolorum, ratione, tenetur pariatur.</p>
                            </CardContent>
                            <CardFooter className="flex flex-ver">
                                <div className="flex-[1]"></div>
                                <div className="flex flex-[1] justify-end">
                                    <button>Read more</button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex flex-1 items-center">
                        <Card className="max-w-md h-full w-full rounded-2xl" >
                            <CardHeader>
                                <div className="relative w-full h-50">
                                    
                                    <Image
                                        src={""}
                                        alt={"abcd"}
                                        fill
                                    />
                                </div>
                                <div>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>This is a description</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent >
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem est cupiditate nulla eos, labore ea. 
                                    Odio veritatis natus, vero distinctio eius nulla quaerat animi fuga rerum dolorum, ratione, tenetur pariatur.</p>
                            </CardContent>
                            <CardFooter className="flex flex-ver">
                                <div className="flex-[1]"></div>
                                <div className="flex flex-[1] justify-end">
                                    <button>Read more</button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex flex-1 items-center">
                         <Card className="max-w-md h-full w-full rounded-2xl" >
                            <CardHeader>
                                <div className="relative w-full h-50">
                                    
                                    <Image
                                        src={""}
                                        alt={"abcd"}
                                        fill
                                    />
                                </div>
                                <div>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>This is a description</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent >
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem est cupiditate nulla eos, labore ea. 
                                    Odio veritatis natus, vero distinctio eius nulla quaerat animi fuga rerum dolorum, ratione, tenetur pariatur.</p>
                            </CardContent>
                            <CardFooter className="flex flex-ver">
                                <div className="flex-[1]"></div>
                                <div className="flex flex-[1] justify-end">
                                    <button>Read more</button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

            </div>
        </main>
    )
}
