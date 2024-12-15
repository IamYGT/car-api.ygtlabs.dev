import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { useTranslation } from '@/Contexts/TranslationContext';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const { t } = useTranslation();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('delete_account')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('delete_account_warning')}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {t('delete_account')}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('confirm_delete_account')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t('delete_account_confirmation')}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value={t('password')}
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder={t('password')}
                        />

                        <InputError
                            message={errors.password ? t(errors.password) : ''}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t('cancel')}
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {t('delete_account')}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}