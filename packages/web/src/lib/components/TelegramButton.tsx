import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { TokenConfig } from "../types";
import { Button } from "./ui/Button";
import { useMintErc721GasCoin } from "../hooks/mint/useMintErc721GasCoin";
import { useOnePerAddress } from "../hooks/mint/useOnePerAddress";
import { TransactionLink } from "./TransactionLink";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import Link from "next/link";
import { getTransactionUrl } from "../utils";
import { useTransactionWrapper } from "../hooks/useTransactionWrapper";
import { Telegram } from "./icons/Telegram";

const TelegramButton = ({ tokenContract }: { tokenContract?: TokenConfig }) => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const { disabled: onePerAddressDisabled, message: onePerAddressMessage } =
    useOnePerAddress(tokenContract);

  return (
      <div className="flex flex-col w-full gap-3">
        <Button
          size="lg"
          fullWidth
          disabled={onePerAddressDisabled ? false : true}
          onClick={() => window.open("https://t.me/+sGhNuUX5krdhYjgx", "_blank")}
        >
          <Telegram className="h-5 w-5"/>
          {"Join Group"}
        </Button>
      </div>
  );
};

export default TelegramButton;
