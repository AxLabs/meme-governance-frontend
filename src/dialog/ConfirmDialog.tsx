import DialogButton from '../button/DialogButton';
import BasicDialog from './BasicDialog';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
  onConfirmData: any;
  confirmButtonText: string;
}

export default function ConfirmDialog(props: Props) {
  const {
    open, onClose, title, children, onConfirm, onConfirmData, confirmButtonText,
  } = props;
  if (!open) {
    return <></>;
  }

  return (
    <BasicDialog open={open} onClose={onClose}>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <DialogButton
            onClick={() => {
              onClose();
              onConfirm(onConfirmData);
            }}
          >
            {confirmButtonText}
          </DialogButton>
        </div>
      </div>
    </BasicDialog>
  );
}
