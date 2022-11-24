import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ abrir, cerrar, titulo, children, fragmento }) => {
    return (
        <Transition.Root show={abrir} as={fragmento}>
            <Dialog as="div" open={abrir} onClose={cerrar} className="relative z-10">
                <Transition.Child
                    as={fragmento}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={fragmento}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="overflow-auto scroll-smooth relative w-full h-[33rem] tableta:h-[45rem]  portatil:h-[48rem] portatilL:h-full max-w-sm rounded-lg bg-white p-5 transition-all">
                                <Dialog.Title className="text-xl font-semibold mb-2">
                                    {titulo}
                                </Dialog.Title>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
