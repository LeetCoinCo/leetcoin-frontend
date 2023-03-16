import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import useOnboard from "./useOnboard";
import { OnboardContext } from "components/base/OnboardContext";
import { useContext } from "react";

import jazzicon from "@metamask/jazzicon";
import { useRef } from "react";

const navigation = [{ name: "Questions", href: "/", current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const onboard = useContext(OnboardContext);

  // const { polkadotAddress, connectPolkadot } = usePolkadot();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [address, setAddress]: any = useState(null);
  const iconRef: any = useRef();

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (address && iconRef.current) {
      iconRef.current.innerHTML = "";
      iconRef.current.appendChild(
        jazzicon(16, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  const connectWallet = async () => {
    if (onboard) {
      console.log("Attempting to select wallet");
      const walletSelected = await onboard.walletSelect();
      if (walletSelected) {
        console.log("Wallet selected");
        const walletChecked = await onboard.walletCheck();
        if (walletChecked) {
          console.log("Wallet checked");
          setSelectedWallet(onboard.getState().wallet.name);

          const newAddress = onboard.getState().address;
          setAddress(newAddress);
          localStorage.setItem("walletAddress", newAddress);
        } else {
          console.log("Wallet check failed");
        }
      } else {
        console.log("Wallet selection failed");
      }
    } else {
      console.log("Onboard instance not available");
    }
  };

  const disconnectWallet = async () => {
    if (onboard) {
      await onboard.walletReset();
      setAddress(null);
    }
  };

  return (
    <Disclosure as="nav" className="border border-b shadow mb-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
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
              {address ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center space-x-2">
                      <div ref={iconRef}></div>
                      <span className="ml-2 truncate">
                        {address.slice(0, 6)}...
                        {address.slice(-4)}
                      </span>
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
                            <a
                              href="/profile"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={disconnectWallet}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm w-full text-left"
                              )}
                            >
                              Disconnect Wallet
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
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
