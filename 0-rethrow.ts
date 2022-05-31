class LowLevelError extends Error {}

class SpecificError extends Error {}

class DomainError extends Error {}


function doLowLevel() {
  throw new LowLevelError("Message occurred under the ground")
}


function someAbstraction() {
  try {
    doLowLevel()
  }
  catch(err) {
    throw err
  }
}


function businessLogic() {
  try {
    someAbstraction()
  }
  catch(err) {
    throw err
  }
}


function main() {
 businessLogic()
}


main()

