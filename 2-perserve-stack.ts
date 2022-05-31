class LowLevelError extends Error {}

class PreserveStackError extends Error {
  constructor(message: string, error: Error) {
    super(message)
    // @ts-ignore
    this.name = this.constructor.name
    if (!error) throw new Error('RethrownError requires a message and error')
    const message_lines =  (this.message.match(/\n/g)||[]).length + 1
    this.stack = this.stack?.split('\n').slice(0, message_lines+1).join('\n') + '\n' +
                 error.stack
  }
}

class SpecificError extends PreserveStackError {}

class DomainError extends PreserveStackError {}


function doLowLevel() {
  throw new LowLevelError("Message occurred under the ground")
}


function someAbstraction() {
  try {
    doLowLevel()
  }
  catch(err) {
    if (err instanceof LowLevelError) {
      throw new SpecificError("There is specific error", err)
    }
  }
}


function businessLogic() {
  try {
    someAbstraction()
  }
  catch(err) {
   if (err instanceof SpecificError) {
     throw new DomainError("Business fails", err)
   }
  }
}


function main() {
 businessLogic()
}


main()

