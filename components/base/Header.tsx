import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import supabase from "../../supabaseClient";
import Link from "next/link";
import AuthModal from "../authentication/AuthModal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

const navigation = [{ name: "Questions", href: "/", current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const disconnect = async () => {
    supabase.auth.signOut();
  };

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  // // const { user } = Auth.useUser();
  // const [localUser, setLocalUser]: any = useState(null);

  // useEffect(() => {
  //   console.log("user", user);
  //   setLocalUser(user);
  // }, [user]);

  return (
    <>
      <Disclosure as="nav" className="border border-b shadow mb-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="font-bold">LeetCore</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-200 text-orange-400"
                              : "text-gray-300 hover:bg-gray-300 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {user ? (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex items-center space-x-2">
                        <span>{user.email}</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={disconnect}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm w-full text-left"
                                )}
                              >
                                Disconnect
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      className="hover:cursor-pointer block px-6 py-3 text-sm  hover:text-gray-800 font-bold border border-gray-300 hover:border-gray-400 rounded"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <AuthModal
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
