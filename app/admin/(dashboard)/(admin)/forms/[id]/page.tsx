"use client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Form from "@/components/admin/form/Form";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/input/InputField";
import Link from "next/link";
import Button from "@/components/admin/ui/button/Button";
import { toast } from "@/hooks/use-toast";
import { Contact } from "@/types/types_contact";
import ContactGet from "./(server)/contact_get";
import ContactUpdate from "./(server)/contact_update";
import ContactCreate from "./(server)/contact_create";
import ContactDelete from "./(server)/contact_delete";
import useHandleErrorCode from "@/components/handle-error-code";

export default function AdminContactPage() {
    const id = Number(useParams().id);
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const handleErrorCode = useHandleErrorCode();


    useEffect(() => {
        id != 0 ? fetchContact() : setLoading(false);
    }, [id]);

    const fetchContact = async () => {
        ContactGet(id)
            .then((res) => {
                console.log("ContactGet response:", res);
                if (res.data) {
                    const contactData = res.data as Contact;
                    setContact(contactData);
                    setLoading(false);
                    return;
                }
                console.error("Error fetching contact form:", res.error);
                setLoading(false);
                // @ts-ignore
                handleErrorCode(res.error.code ?? null);
            })
    }

    const updateContact = async () => {
        if (!contact) {
            console.error("Contact form data is not available for update.");
            handleErrorCode("23503")
            return
        }

        const { data, error } = await ContactUpdate(contact);
        if (data) {
            toast({
                title: "Contact form updated successfully",
                description: "The contact form has been updated in the database.",
                variant: "success",
            })
            console.log("Contact form updated successfully:", data);
            setContact(data);
            return
        }
        console.error("Error updating contact form:", error);
        handleErrorCode(error?.code || null);
    }

    const createContact = async () => {
        if (!contact) {
            console.error("Contact form data is not available for creation.");
            toast({
                title: "Submission Error",
                description: "Not found contact form data to create.",
                variant: "destructive",
            })
            return
        }


        const { data, error } = await ContactCreate(contact);
        if (data) {
            toast({
                title: "Contact form created successfully",
                description: "The contact form has been created in the database.",
                variant: "success",
            })
            setContact(data);
            return
        }
        console.error("Error creating contact form:", error);
        handleErrorCode(error?.code || null);
    }

    const deleteContact = async () => {
        if (!confirm("Are you sure?"))
            return;

        const error = await ContactDelete(id);

        if (!error) {
            toast({
                variant: "default",
                description: "Success",
            });
            ContactGet(id)
        }
        else {
            console.log(error);
            // @ts-ignore
            handleErrorCode(error.code);
        }
    }

    const handleChangeEvent = (event: any) => handleChange(event.target.name, event.target.value);
    const handleChange = (key: string, value: any) => {
        // @ts-ignore
        setContact(prevContact => {
            return {
                ...prevContact,
                [key]: value
            }
        });

    }


    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex justify-center"}>
            <div className={"w-[75%] align-middle"}>
                <Form onSubmit={() => { }}>
                    <div className={"flex flex-col gap-2"}>
                        <Label htmlFor={"id"}>Id</Label>
                        <Input disabled={true} name={"id"} defaultValue={contact?.id} />

                        <Label htmlFor={"name"}>Name (text)</Label>
                        <Input type={"text"} name={"name"} onChange={handleChangeEvent} defaultValue={contact?.name} />


                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>
                                <Link href={"/admin/forms"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                {id != 0 && <Link href={"/admin/forms/0"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Create
                                    </Button>
                                </Link>}
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Button variant={"outline"} className="cursor-pointer" onClick={() => id && deleteContact()}>
                                    Delete
                                </Button>
                                <Button className="cursor-pointer" onClick={() => id ? updateContact() : createContact()}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div >
        </div >
    )

}
