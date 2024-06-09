import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { css } from '../../styled-system/css';

type TimeModalProps = {
  onSubmit: (startTime: string, endTime: string) => void;
};

export const TimeModal = ({ onSubmit }: TimeModalProps) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    onSubmit(startTime, endTime);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={buttonStyleViolet}>시간 설정</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={dialogContentStyle}>
          <Dialog.Title className={dialogTitleStyle}>시간 설정</Dialog.Title>
          <Dialog.Description className={dialogDescriptionStyle}>
            모각코 시간을 설정하세요.
          </Dialog.Description>
          <fieldset className={fieldsetStyle}>
            <label className={labelStyle} htmlFor="start-time">
              시작 시간
            </label>
            <input
              className={inputStyle}
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </fieldset>
          <fieldset className={fieldsetStyle}>
            <label className={labelStyle} htmlFor="end-time">
              종료 시간
            </label>
            <input
              className={inputStyle}
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <button onClick={handleSubmit} className={buttonStyleGreen}>
              설정
            </button>
          </div>
          <Dialog.Close asChild>
            <button className={iconButtonStyle} aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const dialogOverlayStyle = css({
  backgroundColor: 'var(--black-a9)',
  position: 'fixed',
  inset: 0,
  animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
});

const dialogContentStyle = css({
  backgroundColor: 'white',
  borderRadius: '6px',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '25px',
  animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  '&:focus': { outline: 'none' },
});

const dialogTitleStyle = css({
  margin: 0,
  fontWeight: 500,
  color: 'var(--mauve-12)',
  fontSize: '17px',
});

const dialogDescriptionStyle = css({
  margin: '10px 0 20px',
  color: 'var(--mauve-11)',
  fontSize: '15px',
  lineHeight: 1.5,
});

const fieldsetStyle = css({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '15px',
});

const labelStyle = css({
  fontSize: '15px',
  color: 'var(--violet-11)',
  width: '90px',
  textAlign: 'right',
});

const inputStyle = css({
  width: '100%',
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: 1,
  color: 'var(--violet-11)',
  boxShadow: '0 0 0 1px var(--violet-7)',
  height: '35px',
  '&:focus': { boxShadow: '0 0 0 2px var(--violet-8)' },
});

const buttonStyleViolet = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '15px',
  lineHeight: 1,
  fontWeight: 500,
  height: '35px',
  backgroundColor: 'white',
  color: 'var(--violet-11)',
  boxShadow: '0 2px 10px var(--black-a7)',
  '&:hover': { backgroundColor: 'var(--mauve-3)' },
  '&:focus': { boxShadow: '0 0 0 2px black' },
});

const buttonStyleGreen = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '15px',
  lineHeight: 1,
  fontWeight: 500,
  height: '35px',
  backgroundColor: 'var(--green-4)',
  color: 'var(--green-11)',
  '&:hover': { backgroundColor: 'var(--green-5)' },
  '&:focus': { boxShadow: '0 0 0 2px var(--green-7)' },
});

const iconButtonStyle = css({
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: '25px',
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--violet-11)',
  position: 'absolute',
  top: '10px',
  right: '10px',
  '&:hover': { backgroundColor: 'var(--violet-4)' },
  '&:focus': { boxShadow: '0 0 0 2px var(--violet-7)' },
});
