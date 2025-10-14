'use client';
import dynamic from 'next/dynamic';
import { Button } from './ui/button';
import { UserInfo } from '@/types/types_user';
import { Loader2 } from 'lucide-react';

const LogoCanvasOrange = dynamic(() => import('@/components/logo/OrangeLogo'), {
    ssr: false,
    loading: () => <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Amblem yüklenirken lütfen bekleyiniz...</p>
    </div>
});

export default function OrangeTickSection({ user }: { user: UserInfo }) {

    return (
        <div className='h-[50vh] w-full bg-gradient-to-br relative'>

            <LogoCanvasOrange />

            <Button
                variant={'default'}
                className='flex m-2 max-w-96 w-4/5 h-14 font-semibold text-white bg-bite-tongue rounded-full hover:bg-happy-hearts justify-center mx-auto'
            >
                Turuncu Tik Kullanıcısı
            </Button>

            <div className='flex mx-auto justify-center'>
                Sayın <span className='font-semibold text-bite-tongue ml-1'>{user.full_name}</span>
            </div>
        </div>

    )
}
