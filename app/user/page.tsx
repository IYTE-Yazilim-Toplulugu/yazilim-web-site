'use client'
import Form from "@/components/admin/form/Form";
import handleErrorCode from "@/components/handle-error-code";
import Loading from "@/components/loading";
import Checkbox from "@/components/admin/form/input/Checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-container";
import { toast } from "@/hooks/use-toast";
import { getDepartments, getSessionUser, getUserInfo, updateUser } from "@/utils/user_client_util";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/types_user";
import { useTranslations } from "next-intl";


export default function UserPage() {
    const [user, setUser] = useState<UserInfo>()
    const [department, setDepartment] = useState()

    const [loading, setLoading] = useState<boolean>(true);

    const t = useTranslations('user')


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userSession = await getSessionUser();

            if (!userSession?.id) {
                toast({
                    title: t('error.title'),
                    description: t('error.desc'),
                    variant: "destructive",
                });
                return;
            }
            const user = await getUserInfo(userSession.id)

            if (user.error) {
                console.error(user.error);
                handleErrorCode(user.error.code ?? null)
            }
            if (user.data)
                setUser(user.data);

            // @ts-ignore
            setUser(prev => ({
                ...prev,
                email: userSession?.email
            }))
            const x = await getDepartments();
            if (x.error) {
                console.error(x.error);
                handleErrorCode(x.error.code ?? "");
            }

            const selectedDepartment = x.data?.find(
                dept => dept.id === user.data?.department
            );
            setDepartment(selectedDepartment?.name);
        } finally {
            setLoading(false);
        }
    };

    async function onSubmit(user: any) {
        const { data, error } = await updateUser(user);

        if (!error) {
            toast({
                title: t('success.title'),
                description: t('success.desc'),
                variant: "success",
            });
            setUser(data)
        }
        else {
            console.error(error);
            handleErrorCode(error.code ?? "");
        }
    }

    const handleChangeEvent = (event: any) => handleChange(event.target.name, event.target.value);
    const handleChange = (key: string, value: any) => {
        // @ts-ignore
        setUser({
            ...user,
            [key]: value
        });
    }


    if (loading) return <Loading />

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-16'
        >
            <SectionHeader title={t('title')} titleClassName='mt-4 bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget' decorative={false} >
                <motion.span
                    className="absolute -bottom-2 left-2 h-1 bg-primary rounded-l-full bg-gradient-to-r from-golden-nugget to-background to-99%"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                />
            </SectionHeader>

            <div className="flex justify-center">
                <div className={"w-3/4 sm:w-2/3 md:w-1/2 align-middle"}>
                    <Form onSubmit={() => onSubmit(user)}>
                        <div className={"flex flex-col gap-2"}>
                            <Label htmlFor={"full_name"}>{t('name')}</Label>
                            <Input type={"text"} name={"full_name"} disabled defaultValue={user?.full_name} />

                            <Label htmlFor={"place"}>{t('place')}</Label>
                            <Input type={"text"} name={"place"} disabled defaultValue={user?.place} placeholder={"Place"} />


                            <Label htmlFor={"email"}>{t('email')}</Label>
                            <Input type={"email"} name={"email"} disabled defaultValue={user?.email} placeholder={"E-Mail"} />

                            <Label htmlFor={"phone"}>{t('phone')}</Label>
                            <Input type={"phone"} name={"phone"} onChange={handleChangeEvent} defaultValue={user?.phone} placeholder={"Phone Number"} />

                            <Label htmlFor={"school_number"}>{t('school')}</Label>
                            <Input type={"text"} name={"school_number"} disabled defaultValue={user?.school_number} placeholder={"School Number"} />

                            <Label htmlFor={"department"}>{t('department')}</Label>
                            <Input defaultValue={department}
                                disabled placeholder={"Department"} />



                            <div className={"flex gap-2 w-[100%] justify-center"}>
                                <Checkbox
                                    label={t('is_special')}
                                    checked={!!user?.is_special}
                                    onChange={() => { }} />
                                <Checkbox
                                    label={t('is_student')}
                                    checked={!!user?.is_student}
                                    onChange={() => { }} />
                                <Checkbox
                                    label={t('from_iztech')}
                                    checked={!!user?.from_iztech}
                                    onChange={() => { }} />
                            </div>

                            <div className={"flex w-[100%]"}>
                                <div className={"gap-2 flex items-center"}>

                                    <Link href={"/home"}>
                                        <Button variant={'outline'} className="text-white bg-bite-tongue cursor-pointer">
                                            {t('back')}
                                        </Button>
                                    </Link>
                                </div>
                                <div className={"gap-2 flex justify-end w-[100%]"}>
                                    <Button variant={'outline'} className="text-white bg-bite-tongue cursor-pointer" type={"submit"}>
                                        {t('save')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </motion.div>
    )

}
