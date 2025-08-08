"use client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import handleErrorCode from "@/components/handle-error-code";
import Loading from "@/components/loading";
import Form from "@/components/admin/form/Form";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/input/InputField";
import Link from "next/link";
import Button from "@/components/admin/ui/button/Button";
import { toast } from "@/hooks/use-toast";
import { MessageCircleQuestionIcon } from "lucide-react";
import { Configuration } from "@/types/types_config";
import ConfigurationGet from "./(server)/configuration_get";
import ConfigurationUpdate from "./(server)/configuration_update";
import ConfigurationCreate from "./(server)/configuration_create";
import ConfigurationDelete from "./(server)/configuration_delete";

export default function AdminConfigurationPage() {
    const id = Number(useParams().id);
    const [configuration, setConfiguration] = useState<Configuration | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        id != 0 ? fetchConfiguration() : setLoading(false);
    }, [id]);

    const fetchConfiguration = async () => {
        ConfigurationGet(id)
            .then((res) => {
                console.log("ConfigurationGet response:", res);
                if (res.data) {
                    const configrationData = res.data as Configuration;
                    setConfiguration(configrationData);
                    setLoading(false);
                    return;
                }
                console.error("Error fetching configuration:", res.error);
                setLoading(false);
                // @ts-ignore
                handleErrorCode(res.error.code ?? null);
            })
    }

    const updateConfiguration = async () => {
        if (!configuration) {
            console.error("Configuration data is not available for update.");
            handleErrorCode("23503")
            return
        }

        const { data, error } = await ConfigurationUpdate(configuration);
        if (data) {
            toast({
                title: "Configuration updated successfully",
                description: "The configuration has been updated in the database.",
                variant: "success",
            })
            console.log("Configuration updated successfully:", data);
            setConfiguration(data);
            return
        }
        console.error("Error updating configuration:", error);
        handleErrorCode(error?.code || null);
    }

    const createConfiguration = async () => {
        if (!configuration) {
            console.error("Configuration data is not available for creation.");
            toast({
                title: "Submission Error",
                description: "Not found configuration data to create.",
                variant: "destructive",
            })
            return
        }


        const { data, error } = await ConfigurationCreate(configuration);
        if (data) {
            toast({
                title: "Configuration created successfully",
                description: "The configuration has been created in the database.",
                variant: "success",
            })
            setConfiguration(data);
            return
        }
        console.error("Error creating configuration:", error);
        handleErrorCode(error?.code || null);
    }

    const deleteConfiguration = async () => {
        if (!confirm("Are you sure?"))
            return;

        const error = await ConfigurationDelete(id);

        if (!error) {
            toast({
                variant: "default",
                description: "Success",
            });
            ConfigurationGet(id)
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
        setConfiguration(prevConfiguration => {
            return {
                ...prevConfiguration,
                [key]: value
            }
        });

    }


    const handleChangeJSON = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            if (e.target.value != "") {
                const parsed = JSON.parse(e.target.value);
                setConfiguration(prevConfiguration => {
                    if (!prevConfiguration) return null;

                    return {
                        ...prevConfiguration,
                        [e.target.name]: parsed,
                    };
                });
            } else {
                // @ts-ignore
                setConfiguration(prevConfiguration => ({
                    ...prevConfiguration,
                    [e.target.name]: "",
                }))
            }

            switch (e.target.name) {
                case "value":
                    setError(prevError => ({
                        ...prevError,
                        value: ""
                    }));
                    break;
            }
        } catch {
            switch (e.target.name) {
                case "value":
                    setError(prevError => ({
                        ...prevError,
                        questions: "Invalid JSON format. Please check your input."
                    }));
                    break
            }
        }
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex justify-center"}>
            <div className={"w-[75%] align-middle"}>
                <Form onSubmit={() => { }}>
                    <div className={"flex flex-col gap-2"}>
                        <Label htmlFor={"id"}>Id</Label>
                        <Input disabled={true} name={"id"} defaultValue={configuration?.id} />

                        <Label htmlFor={"key"}>Key (text)</Label>
                        <Input type={"text"} name={"key"} onChange={handleChangeEvent} defaultValue={configuration?.key} />


                        <div className={"relative group flex gap-2"}>
                            <Label htmlFor={"value"}>Value</Label>
                            <span className="peer text-gray-500">
                                <MessageCircleQuestionIcon className="w-5 h-5" />
                            </span>
                            <p className="p-4 mt-1 absolute left-1/3 -translate-x-1/2
                                hidden group-hover:grid
                                max-w-[20vw] text-sm overflow-auto
                                top-full rounded-lg whitespace-pre-wrap
                                bg-card text-foreground border border-gray-500
                                shadow-lg z-40 animate-fadeIn">
                                {`value - json (object)
--- Value in JSON format, e.g. {\"id\": 1, \"required\": true, \"options\": [\"Option1\", \"Option2\"], \"question\": \"What is your favorite color?\", \"placeholder\": \"Type here...\"} ---`}</p>
                        </div>
                        <textarea name={"value"}
                            onChange={handleChangeJSON}
                            defaultValue={configuration?.value ? JSON.stringify(configuration.value, null, 4) : ""}
                            className="w-full p-2 dark:bg-gray-900 rounded-md border border-gray-700 shadow-sm outline-none"
                            placeholder="Type questions in JSON format"
                            rows={10}
                        />
                        {error && (<p className="text-destructive">{error["value"]}</p>)}

                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>
                                <Link href={"/admin/configuration"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                {id != 0 && <Link href={"/admin/configuration/0"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Create
                                    </Button>
                                </Link>}
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Button variant={"outline"} className="cursor-pointer" onClick={() => id && deleteConfiguration()}>
                                    Delete
                                </Button>
                                <Button className="cursor-pointer" onClick={() => id ? updateConfiguration() : createConfiguration()}>
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
