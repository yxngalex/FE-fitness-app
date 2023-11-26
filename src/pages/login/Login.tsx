import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import Register from "@/components/register/Register.tsx";
import {quotes} from "@/data/quotes.ts";
import {loginUser} from "@/api/auth/auth.redaxios.ts";


interface Quote {
    id: number,
    name: string,
    quote: string,
    profession: string
}

const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * quotes.length)

    return quotes[randomIndex];
}

interface Login {
    setErrorMessage: (error: string | null) => void;
    setLoginMessage: (success: string | null) => void;
}

const Login = ({setErrorMessage, setLoginMessage}: Login) => {
    const [showRegister, setShowRegister] = useState(false);
    const [randomQuote, setRandomQuote] = useState<Partial<Quote>>({});
    const imgUrl = "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const bgColor = "#f9f9f9";


    useEffect(() => {
        setRandomQuote(getRandomQuote);
    }, [])


    const toggleView = () => {
        setShowRegister(!showRegister);
    }

    const formSchema = z.object({
        username: z.string().min(1, {
            message: "Field can't be empty!",
        }),
        password: z.string().min(1, {
            message: "Field can't be empty!"
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        loginUser(values.username, values.password).then(r => {
                console.log(r);
            }
        ).catch(e => {
            console.error(e)
            setErrorMessage(e.data)
        });
    }

    return (
        <section className="min-h-screen flex items-stretch text-white ">
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                 style={{backgroundImage: `url(${imgUrl})`}}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">"{randomQuote.quote}"</h1>
                    <p className="text-xl my-4">- {randomQuote.name}, {randomQuote.profession}</p>
                </div>
                <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                    <span>
                        <a href="https://www.facebook.com" target="_blank"><svg fill="#fff"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"><path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                </span>
                    <span>
                    <a href="https://www.instagram.com" target="_blank"><svg fill="#fff"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             width="24" height="24" viewBox="0 0 24 24"><path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                </span>
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                 style={{backgroundColor: `${bgColor}`}}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                     style={{backgroundImage: `url(${imgUrl})`}}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <div className="my-6">
                        <h1 className="text-4xl lg:text-black text-white">MyFitnessApp</h1>
                    </div>
                    {showRegister ? (
                        <Register onToggleView={toggleView} onRegisterError={setErrorMessage} onRegisterSuccess={setLoginMessage}/>
                    ) : (
                        <>
                            <p className="lg:text-black text-white text-xl">
                                Welcome back!
                            </p>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}
                                      className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                    <div className="pb-2 pt-4">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Username" {...field}
                                                               className="block w-full h-full p-4 text-lg rounded-sm bg-black placeholder:text-zinc-100 hover:bg-gray-900"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}></FormField>
                                    </div>
                                    <div className="pb-2 pt-4">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field}
                                                               className="block w-full h-full p-4 text-lg rounded-sm bg-black placeholder:text-zinc-100 hover:bg-gray-900"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}></FormField>
                                    </div>
                                    <div className="px-4 pb-2 pt-6">
                                        <Button
                                            className="uppercase block w-full py-1 text-lg hover:bg-gray-400 focus:outline-none lg:bg-black bg-white lg:text-white text-black lg:hover:bg-gray-800">Sign
                                            In</Button>
                                    </div>
                                    <div className="px-4 pb-2 pt-7">
                                        <a onClick={toggleView} className="cursor-pointer"><p
                                            className="uppercase lg:text-black text-white hover:underline w-full text-lg">
                                            Or
                                            become a
                                            member
                                            today!</p></a>
                                    </div>

                                    <div
                                        className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                                        <a href="https://www.facebook.com" target="_blank">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.instagram.com" target="_blank">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </form>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login