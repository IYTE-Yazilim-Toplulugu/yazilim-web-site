import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Discount } from "@/types/types_orangetick";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getDiscountImage } from "@/utils/orangetick_client_utils";

interface DiscountCardProps {
    discount: Discount;
}

export function DiscountCard({ discount }: DiscountCardProps) {
    const t = useTranslations('orangetick');

    const formatDate = (dateString: string | null) => {
        if (!dateString) return t('not_published');

        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isPublished = discount.is_published;
    const isExpired = discount.published_at && new Date(discount.published_at) < new Date();

    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-bite-tongue/20">
            <div className="relative">
                <div className="h-32 bg-gradient-to-r from-bite-tongue to-happy-hearts flex items-center justify-center">
                    <Image src={getDiscountImage(discount.image_url) || '/images/yazilim.png'}
                        alt="Orange Tick Logo"
                        width={1000}
                        height={500}
                        className="object-cover h-32 w-full"
                    />
                </div>
                {/* <Badge */}
                {/*     className="absolute top-4 right-4" */}
                {/*     variant={isPublished ? "default" : "secondary"} */}
                {/* > */}
                {/*     {isPublished ? t('published') : t('draft')} */}
                {/* </Badge> */}
            </div>

            <CardHeader className="flex-grow">
                <CardTitle className="line-clamp-2">{discount.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                    {discount.description}
                </CardDescription>
            </CardHeader>

            {/* <CardContent> */}
            {/*     <div className="flex items-center text-sm text-muted-foreground mb-1"> */}
            {/*         <Calendar className="mr-2 h-4 w-4" /> */}
            {/*         {t('created_at')} {formatDate(discount.created_at)} */}
            {/*     </div> */}
            {/**/}
            {/*     {discount.published_at && ( */}
            {/*         <div className="flex items-center text-sm text-muted-foreground"> */}
            {/*             <CheckCircle className="mr-2 h-4 w-4" /> */}
            {/*             {t('published_at')} {formatDate(discount.published_at)} */}
            {/*         </div> */}
            {/*     )} */}
            {/* </CardContent> */}

            {/* <CardFooter className="flex justify-between items-center"> */}
            {/*     <Badge variant="outline" className="flex items-center gap-1"> */}
            {/*         <Clock className="h-3 w-3" /> */}
            {/*         {isExpired ? t('expired') : isPublished ? t('active') : t('pending')} */}
            {/*     </Badge> */}
            {/* </CardFooter> */}
        </Card>
    );
}

