'use client'

import * as React from 'react'
import {EyeIcon, EyeOffIcon} from 'lucide-react'

import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {cn} from '@/src/lib/utils'

export default function PasswordInput({className, ...props}: Omit<React.ComponentProps<"input">, "type">) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 z-10 h-full px-3 py-2 hover:bg-transparent"
        onClick={(e) => {
          e.preventDefault()
          setShowPassword((prev) => !prev)
        }}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true"/>
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true"/>
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>

      {/* hides browsers password toggles */}
      <style>
        {`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}
      </style>
    </div>
  )
}
